import { defineStore } from "pinia";

export const useConceptStore = defineStore('concepts', () => {
  // State
  const concepts = ref([]);

  // Getters
  const getConcepts = () => concepts.value;
  const getConceptById = (id) => concepts.value.find((concept) => concept.id === id);
  const getMostRecentConcept = () => concepts.value.length ? concepts.value.sort((a, b) => new Date(a.updated_at) - new Date(b.updated_at))[0] : null;

  // Setters
  const setConcepts = (payload) => concepts.value = payload;

  return { concepts, getConcepts, getMostRecentConcept, getConceptById, setConcepts };
}, {
  persist: true
});