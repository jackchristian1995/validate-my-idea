import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async (event) => {
  const rawBody = await readRawBody(event);
  const sig = getHeader(event, 'stripe-signature');
  const { stripeCreditWebhookSecret, stripeSecretKey, supabaseProjectUrl, supabaseServiceRoleKey } = useRuntimeConfig();

  // Validate request
  if (!sig || !rawBody) {
    throw createError({ statusCode: 400, statusMessage: 'Bad request. Missing signature or body.' });
  }

  // Create Stripe Webhook Event
  const stripe = new Stripe(stripeSecretKey);
  const hook = stripe.webhooks.constructEvent(rawBody, sig, stripeCreditWebhookSecret);

  // Check webhook event type
  if (hook.type === 'payment_intent.succeeded') throw createError({ statusCode: 400, statusMessage: 'Invalid webhook type.' });

  // Retrieve metadata values to update in the DB
  const { metadata: { user_id, credits } } = hook.data.object;
  
  // Initialise the Supabase client with service role to bypass RLS
  const supabase = createClient(supabaseProjectUrl, supabaseServiceRoleKey);

  // Get current user credits level
  const { data: { user }, error: getUserError } = await supabase.auth.admin.getUserById(user_id);
  if (getUserError) throw createError({ statusMessage: getUserError.message });
  const currentCreditBalance = user.user_metadata.credits;

  const { data, error: updateUserError } = await supabase.auth.admin.updateUserById(user_id, {
    user_metadata: {
      credits: parseFloat(currentCreditBalance) + parseFloat(credits)
    }
  });
  if (updateUserError) throw createError({ statusMessage: updateUserError.message });

  return true;
});
