
export const baseAPI_URL = 'https://petlovers-ls3b.onrender.com' // Rota do render

// Para testar localmente
// export const baseAPI_URL = 'http://192.168.1.239:3000' // Para testar no celular, substituir 'localhost' pelo endereço IP:3000 (porta do servidor)


export const userAPI_URL = `${baseAPI_URL}/api/user`;
export const getUserByIdAPI_URL = (userId) => `${baseAPI_URL}/api/user/${userId}`; // Rota para obter um usuário pelo ID

export const getAllPetsAPI_URL = `${baseAPI_URL}/api/allpets`;
export const cardpetsAPI_URL = `${baseAPI_URL}/api/fourpets`;
export const AvaliacaoAPI_URL = `${baseAPI_URL}/api/avaliacao`;
export const petAPI_URL = `${baseAPI_URL}/api/pet`;
export const matchAPI_URL = `${baseAPI_URL}/api/match`;
export const matchDetailsAPI_URL = `${baseAPI_URL}/api/match/:id/details'`;


