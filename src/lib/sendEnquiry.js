import { services } from '../data/content'

/**
 * Posts an enquiry to /send.php (public/send.php), which emails it to the
 * business. Resolves on success and throws an Error with a customer-friendly
 * message otherwise.
 *
 * `service` can be a service slug, "not-sure" or empty; it is turned into a
 * readable name here so the email says "Carpets & Underlays", not "carpet".
 */
export async function sendEnquiry({ name, phone, email = '', postcode, service = '', details = '', website = '' }) {
  const serviceLabel = services[service]?.name || (service === 'not-sure' ? 'Not sure yet' : service)

  let response
  try {
    response = await fetch('/send.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, email, postcode, service: serviceLabel, details, website }),
    })
  } catch {
    throw new Error('We could not reach the server. Please call or WhatsApp us instead.')
  }

  let result = null
  try {
    result = await response.json()
  } catch {
    /* non-JSON reply, handled below */
  }

  if (!response.ok || !result?.ok) {
    throw new Error(result?.error || 'Sorry, something went wrong. Please call or WhatsApp us instead.')
  }
}
