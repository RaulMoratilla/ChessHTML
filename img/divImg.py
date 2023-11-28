from PIL import Image

# Carga la imagen principal
imagen_principal = Image.open('img/pieces.png')

# Tamaño de las imágenes pequeñas
ancho_pequena = 333
alto_pequena = 333

color = ["w", "b"]
pieza = ["king", "queen", "bishop", "horse", "rook", "pawn"]

# Número de filas y columnas
filas = 2
columnas = 6

# Itera sobre las filas y columnas para recortar y guardar cada imagen pequeña
for fila in range(filas):
    for columna in range(columnas):
        # Calcula las coordenadas de recorte
        izquierda = columna * ancho_pequena
        arriba = fila * alto_pequena
        derecha = izquierda + ancho_pequena
        abajo = arriba + alto_pequena

        # Recorta la imagen principal
        imagen_pequena = imagen_principal.crop((izquierda, arriba, derecha, abajo))

        # Guarda la imagen pequeña
        nombre_archivo = f'img/{color[fila]}_{pieza[columna]}.png'
        imagen_pequena.save(nombre_archivo)

print("Imágenes pequeñas guardadas exitosamente.")
