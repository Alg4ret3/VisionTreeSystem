export async function analizarImagen(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(
    "https://alg4ret3-treevisionapi.hf.space/predict/",
    { method: "POST", body: formData }
  );

  const text = await res.text(); // capturar texto sin parsear

  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${text}`);
  }
  return JSON.parse(text);
}
