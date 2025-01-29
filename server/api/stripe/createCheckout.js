import supabase from '~/server/utils/supabase';
import Stripe from 'stripe';

export default defineEventHandler(async (event) => {
  const { cancelUrl, product } = await readBody(event);
  const { stripePublishableKey, stripeSecretKey } = useRuntimeConfig();

  // Get logged in user data
  const authToken = getCookie(event, 'auth_token');
  if (!authToken) throw createError({ statusCode: 401, statusMessage: 'No user session.' });
  const { data: { user }, error } = await supabase.auth.getUser(authToken);
  if (error) throw createError({ statusMessage: error.message });

  const headers = {
    'Authorization': `Bearer ${stripeSecretKey}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  }

  const stripe = new Stripe(stripeSecretKey);

  const checkout = await stripe.checkout.sessions.create({
    mode: 'payment',
    success_url: cancelUrl,
    cancel_url: cancelUrl,
    line_items: [
      {
        price: product.id,
        quantity: 1,
        adjustable_quantity: {
          enabled: false
        }
      }
    ],
    metadata: {
      'user_id': user.id,
      credits: product.quantity
    }
  });

  if (checkout.error) {
    throw createError({ statusMessage: checkout.error.message });
  }

  return checkout.url;
});