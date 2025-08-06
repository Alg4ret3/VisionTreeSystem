// Esta función analiza una imagen enviándola a mi API de Hugging Face (VisionTreePasto)
export async function analizarImagen(file: File) {
  // Primero creo un FormData para adjuntar el archivo de imagen
  const formData = new FormData();
  formData.append("file", file);

  // Hago la solicitud POST al endpoint /predict/ de mi API desplegada en Hugging Face Spaces
  const res = await fetch(
    "https://alg4ret3-visiontreepasto.hf.space/predict/",
    { method: "POST", body: formData }
  );

  // Capturo la respuesta como texto, así puedo mostrar errores exactos si algo falla
  const text = await res.text();

  // Si la respuesta no es OK, lanzo un error con el código y el detalle del mensaje
  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${text}`);
  }

  // Si todo está bien, convierto la respuesta a JSON y la devuelvo
  return JSON.parse(text);
}
