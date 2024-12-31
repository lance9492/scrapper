export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^(\+27|0)[1-9][0-9]{8}$/
  return phoneRegex.test(phone)
}

export const isValidIdNumber = (idNumber: string): boolean => {
  // South African ID number validation
  const idRegex = /^([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])([0-9]{4})([0-9]{3})([0-9])$/
  return idRegex.test(idNumber)
}