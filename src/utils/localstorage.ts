export function storeEmail(email: string) {
    localStorage.setItem('userEmail', email)
}

export function getEmail() {
    return localStorage.getItem('userEmail')
}

export function deleteStoredEmail() {
    localStorage.removeItem('userEmail')
}