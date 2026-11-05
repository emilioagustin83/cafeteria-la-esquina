// Envío del formulario de contacto: SIMULADO.
// No hay backend: el mensaje se valida, se "envía" con una pequeña espera y se guarda en
// localStorage (clave STORAGE_KEY) para poder ver los recibidos en la sección «Mensajes recibidos».
// Para conectarlo a un backend real, sustituye el cuerpo de sendMessage por un fetch a tu API.

export type ContactMessage = {
  id: string
  name: string
  email: string
  message: string
  sentAt: string
}

export const STORAGE_KEY = 'cafe-la-esquina:mensajes'

export type ContactInput = { name: string; email: string; message: string }
export type ContactErrors = Partial<Record<keyof ContactInput, string>>

export function validate(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {}
  if (input.name.trim().length < 2) errors.name = 'Escribe tu nombre.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) errors.email = 'Escribe un email válido.'
  if (input.message.trim().length < 10) errors.message = 'Cuéntanos un poco más (mínimo 10 caracteres).'
  if (input.message.length > 1000) errors.message = 'Máximo 1000 caracteres.'
  return errors
}

export function loadMessages(): ContactMessage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as ContactMessage[]) : []
  } catch {
    return []
  }
}

export async function sendMessage(input: ContactInput): Promise<ContactMessage> {
  await new Promise((r) => setTimeout(r, 700)) // simula la latencia de red
  const msg: ContactMessage = {
    id: Math.random().toString(36).slice(2, 10),
    name: input.name.trim(),
    email: input.email.trim(),
    message: input.message.trim(),
    sentAt: new Date().toISOString(),
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([msg, ...loadMessages()].slice(0, 50)))
  } catch {
    // modo privado / almacenamiento bloqueado: el envío se da por bueno igualmente
  }
  return msg
}

export function resetMessages() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* nada que borrar */
  }
}
