// src/services/authService.js


export async function login(email, senha) {

  const usuario = await window.api.login.login(email, senha); // {id,nome,email,tipo}
  if (!usuario || !usuario.id) throw new Error("Email ou senha inválidos.");


  const user = await window.api.user.setCurrentUser(usuario);

  if (!user) throw new Error("Falha ao setar usuário atual (setCurrentUser).");

  return usuario;
}

export async function getCurrentUser() {

  if (!window.api?.user?.getCurrentUser) return null;
  return await window.api.user.getCurrentUser(); // {id,nome,email,tipo} | null
  
}

export async function logout() {

  if (!window.api?.user?.setCurrentUser) return true;
  return await window.api.user.setCurrentUser(null);

}
