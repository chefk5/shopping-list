import { ref, toValue, watchEffect } from 'vue'

export function useFetch(url: string) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)

  watchEffect(() => {
    data.value = null
    error.value = null
    loading.value = true

    fetch(toValue(url))
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((error) => (error.value = error))
      .finally(() => (loading.value = false))
  })

  return {
    data,
    error,
    loading,
  }
}
