DROP DATABASE tiendaDB;
CREATE DATABASE tiendaDB;
use tiendaDB;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  apellido VARCHAR(100),
  correo VARCHAR(100) UNIQUE,
  contrasena VARCHAR(255)
);

CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    categoria VARCHAR(100),
    subcategoria VARCHAR(100),
    descripcion TEXT,
    imagen VARCHAR(255),
    precio DECIMAL(10,2),
    stock INT
);
CREATE TABLE venta (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fecha DATETIME,
  total DECIMAL(10,2)
);

CREATE TABLE venta_detalle (
  id INT AUTO_INCREMENT PRIMARY KEY,
  venta_id INT,
  producto_id INT,
  cantidad INT,
  precio_unitario DECIMAL(10,2),
  FOREIGN KEY (venta_id) REFERENCES venta(id),
  FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- CALZADO - DAMAS
INSERT INTO productos (nombre, categoria, subcategoria, descripcion, imagen, precio, stock) VALUES
('Sandalias elegantes', 'calzado', 'damas', 'Tacón medio, estilo formal.', 'sandalias-elegantes.png', 34.99, 10),
('Zapatillas deportivas mujer', 'calzado', 'damas', 'Para uso casual y deportivo.', 'tennis-mujer.png', 39.00, 15),
('Botas casuales', 'calzado', 'damas', 'Caña media para clima fresco.', 'botas-mujer.png', 44.50, 12),
('Flats de ballet', 'calzado', 'damas', 'Comodidad y elegancia.', 'zapato-flat.png', 29.95, 20),
('Zapatos de oficina', 'calzado', 'damas', 'Perfectos para trabajo.', 'zapatos-oficina.png', 36.00, 18);

-- CALZADO - CABALLEROS
INSERT INTO productos (nombre, categoria, subcategoria, descripcion, imagen, precio, stock) VALUES
('Zapatillas running hombre', 'calzado', 'caballeros', 'Ligereza y soporte.', 'tennis-hombre.png', 49.00, 14),
('Zapatos formales cuero', 'calzado', 'caballeros', 'Para eventos o reuniones.', 'zapatos-formales.png', 55.00, 10),
('Mocasines casuales', 'calzado', 'caballeros', 'Fáciles de combinar.', 'mocasines-casuales.png', 42.00, 12),
('Botines de trabajo', 'calzado', 'caballeros', 'Robustos y duraderos.', 'botines-trabajo.png', 60.00, 8),
('Tenis casuales hombre', 'calzado', 'caballeros', 'Estilo urbano.', 'tenis-casuales.png', 35.50, 18);


-- ACCESORIOS MUJERES
INSERT INTO productos (nombre, categoria, subcategoria, descripcion, imagen, precio, stock) VALUES
('Collar dorado', 'mujeres', 'accesorios mujeres', 'Minimalista y moderno.', 'collar-dorado.png', 14.00, 30),
('Pulsera de perlas', 'mujeres', 'accesorios mujeres', 'Elegante y versátil.', 'pulsera-perlas.png', 12.00, 25),
('Bolso cruzado', 'mujeres', 'accesorios mujeres', 'Compacto y funcional.', 'bolso-cruzado.png', 29.99, 10),
('Gafas oversized', 'mujeres', 'accesorios mujeres', 'Protección UV.', 'gafas-oversized.png', 18.00, 15),
('Cinturón ancho', 'mujeres', 'accesorios mujeres', 'Para vestidos o jeans.', 'cinturon-ancho.png', 11.99, 20);

-- TOPS MUJERES
INSERT INTO productos (nombre, categoria, subcategoria, descripcion, imagen, precio, stock) VALUES
('Blusa manga corta', 'mujeres', 'tops mujeres', 'Tela fresca.', 'blusa-corta.png', 19.50, 15),
('Top deportivo', 'mujeres', 'tops mujeres', 'Ideal para ejercicio.', 'top-deportivo.png', 22.00, 20),
('Crop top floral', 'mujeres', 'tops mujeres', 'Diseño juvenil.', 'crop-floral.png', 18.00, 18),
('Camisa oversize', 'mujeres', 'tops mujeres', 'Moda relajada.', 'camisa-oversize.png', 24.00, 12),
('Top satinado', 'mujeres', 'tops mujeres', 'Ideal para noche.', 'top-satinado.png', 27.00, 10);

-- BOTTOMS MUJERES
INSERT INTO productos (nombre, categoria, subcategoria, descripcion, imagen, precio, stock) VALUES
('Pantalón palazzo', 'mujeres', 'bottoms mujeres', 'Amplio y elegante.', 'pantalon-palazzo.png', 32.00, 14),
('Falda corta', 'mujeres', 'bottoms mujeres', 'Estilo moderno.', 'falda-corta.png', 22.00, 16),
('Jeans high-waist', 'mujeres', 'bottoms mujeres', 'Ajuste cómodo.', 'high-waist.png', 28.00, 18),
('Short deportivo', 'mujeres', 'bottoms mujeres', 'Ideal para verano.', 'short-deportivo.png', 17.00, 20),
('Leggings algodón', 'mujeres', 'bottoms mujeres', 'Suaves y elásticos.', 'leggins.png', 19.99, 25);


-- MUJERES - ROPA INTERIOR CONJUNTOS
INSERT INTO productos (nombre, categoria, subcategoria, descripcion, imagen, precio, stock) VALUES
('Conjunto encaje negro', 'mujeres', 'ropa interior conjuntos', 'Sensual y delicado.', 'conjunto-encaje.jpg', 19.99, 20),
('Conjunto algodón básico', 'mujeres', 'ropa interior conjuntos', 'Comodidad total.', 'conjunto-algodon.jpg', 14.50, 25),
('Conjunto con push-up', 'mujeres', 'ropa interior conjuntos', 'Realce natural.', 'conjunto-pushup.jpg', 22.00, 18),
('Conjunto estampado floral', 'mujeres', 'ropa interior conjuntos', 'Fresco y juvenil.', 'conjunto-floral.jpg', 16.75, 22),
('Conjunto sin costuras', 'mujeres', 'ropa interior conjuntos', 'Perfecto para ropa ajustada.', 'sin-costuras.jpg', 18.99, 15),
('Conjunto satinado', 'mujeres', 'ropa interior conjuntos', 'Toque elegante y suave.', 'conjunto-satinado.jpg', 24.50, 10),
('Conjunto deportivo', 'mujeres', 'ropa interior conjuntos', 'Ideal para el día a día.', 'conjunto-deportivo.jpg', 15.25, 30);

-- MUJERES - TALLA GRANDE
INSERT INTO productos (nombre, categoria, subcategoria, descripcion, imagen, precio, stock) VALUES
('Vestido largo floral', 'mujeres', 'talla grande', 'Cómodo y estilizado.', 'vestido-floral.jpg', 32.99, 12),
('Blusa oversize lisa', 'mujeres', 'talla grande', 'Corte amplio y fresco.', 'blusa-oversize.jpg', 19.99, 18),
('Pantalón fluide', 'mujeres', 'talla grande', 'Ideal para cualquier ocasión.', 'pantalon-fluide.jpg', 27.50, 14),
('T-shirt estampada', 'mujeres', 'talla grande', 'Con mensajes positivos.', 'camisa-estampada.jpg', 17.50, 20),
('Falda maxi plisada', 'mujeres', 'talla grande', 'Para climas cálidos.', 'falda-maxi.jpg', 25.00, 15),
('Jeans ajustados', 'mujeres', 'talla grande', 'Estilo moderno.', 'jeans-ajustados.jpg', 30.00, 10),
('Blazer entallado', 'mujeres', 'talla grande', 'Ideal para oficina.', 'blazer-entallado.jpg', 34.99, 8);

-- MUJERES - MATERNIDAD
INSERT INTO productos (nombre, categoria, subcategoria, descripcion, imagen, precio, stock) VALUES
('Blusa de maternidad', 'mujeres', 'maternidad', 'Cómoda y práctica.', 'blusa-maternidad.jpg', 22.00, 15),
('Leggings premamá', 'mujeres', 'maternidad', 'Soporte y elasticidad.', 'leggins-premama.jpg', 19.99, 20),
('Vestido suelto algodón', 'mujeres', 'maternidad', 'Suave y transpirable.', 'vestido-suelto.jpg', 25.50, 12),
('Pijama maternidad', 'mujeres', 'maternidad', 'Con apertura para lactancia.', 'mujeres_mat4.jpg', 29.99, 10),
('Pantalón con banda elástica', 'mujeres', 'maternidad', 'Adaptable al crecimiento.', 'mujeres_mat5.jpg', 27.99, 14),
('Top sin costuras premamá', 'mujeres', 'maternidad', 'Ideal para comodidad diaria.', 'mujeres_mat6.jpg', 17.50, 20),
('Falda midi premamá', 'mujeres', 'maternidad', 'Diseño moderno y maternal.', 'mujeres_mat7.jpg', 24.00, 16);

-- ACCESORIOS CABALLEROS
INSERT INTO productos (nombre, categoria, subcategoria, descripcion, imagen, precio, stock) VALUES
('Reloj deportivo', 'caballeros', 'accesorios caballeros', 'Resistente al agua.', 'acc_cab1.jpg', 39.99, 10),
('Gorra snapback', 'caballeros', 'accesorios caballeros', 'Estilo urbano.', 'acc_cab2.jpg', 15.00, 20),
('Cartera negra', 'caballeros', 'accesorios caballeros', 'Diseño clásico.', 'acc_cab3.jpg', 19.99, 18),
('Cinturón cuero', 'caballeros', 'accesorios caballeros', 'Ajustable.', 'acc_cab4.jpg', 17.00, 25),
('Mochila urbana', 'caballeros', 'accesorios caballeros', 'Práctica y moderna.', 'acc_cab5.jpg', 29.50, 12);

-- TOPS CABALLEROS
INSERT INTO productos (nombre, categoria, subcategoria, descripcion, imagen, precio, stock) VALUES
('Camiseta básica', 'caballeros', 'tops caballeros', '100% algodón.', 'top_cab1.jpg', 15.00, 30),
('Camisa formal', 'caballeros', 'tops caballeros', 'Ideal para oficina.', 'top_cab2.jpg', 28.00, 10),
('Polera casual', 'caballeros', 'tops caballeros', 'Cuello redondo.', 'top_cab3.jpg', 18.00, 20),
('Sweater liviano', 'caballeros', 'tops caballeros', 'Para clima fresco.', 'top_cab4.jpg', 26.00, 12),
('Chaleco urbano', 'caballeros', 'tops caballeros', 'Sin mangas.', 'top_cab5.jpg', 23.50, 14);

-- BOTTOMS CABALLEROS
INSERT INTO productos (nombre, categoria, subcategoria, descripcion, imagen, precio, stock) VALUES
('Pantalón jogger', 'caballeros', 'bottoms caballeros', 'Comodidad y estilo.', 'bot_cab1.jpg', 25.00, 15),
('Short deportivo', 'caballeros', 'bottoms caballeros', 'Para entreno.', 'bot_cab2.jpg', 19.00, 18),
('Pantalón cargo', 'caballeros', 'bottoms caballeros', 'Con bolsillos.', 'bot_cab3.jpg', 30.00, 10),
('Jeans rectos', 'caballeros', 'bottoms caballeros', 'Clásico y durable.', 'bot_cab4.jpg', 27.00, 14),
('Pantalón de vestir', 'caballeros', 'bottoms caballeros', 'Para eventos formales.', 'bot_cab5.jpg', 35.00, 8);

-- CABALLEROS - ROPA INTERIOR
INSERT INTO productos (nombre, categoria, subcategoria, descripcion, imagen, precio, stock) VALUES
('Boxers algodón pack x3', 'caballeros', 'ropa interior', 'Cómodos y transpirables.', 'cab_int1.jpg', 21.00, 30),
('Slip clásico', 'caballeros', 'ropa interior', 'Diseño tradicional.', 'cab_int2.jpg', 16.99, 25),
('Boxer largo deportivo', 'caballeros', 'ropa interior', 'Soporte y elasticidad.', 'cab_int3.jpg', 14.50, 22),
('Ropa interior térmica', 'caballeros', 'ropa interior', 'Ideal para clima frío.', 'cab_int4.jpg', 20.00, 12),
('Calzoncillo brief', 'caballeros', 'ropa interior', 'Corte cómodo.', 'cab_int5.jpg', 17.00, 15),
('Boxers estampados', 'caballeros', 'ropa interior', 'Estilo único.', 'cab_int6.jpg', 18.50, 20),
('Boxer sin costuras', 'caballeros', 'ropa interior', 'Invisible bajo la ropa.', 'cab_int7.jpg', 19.99, 18);

-- CABALLEROS - TALLA GRANDE
INSERT INTO productos (nombre, categoria, subcategoria, descripcion, imagen, precio, stock) VALUES
('Camisa manga larga XL', 'caballeros', 'talla grande', 'Cómoda y amplia.', 'cab_tg1.jpg', 28.00, 10),
('T-shirt oversized', 'caballeros', 'talla grande', 'Diseño moderno y suelto.', 'cab_tg2.jpg', 17.99, 14),
('Pantalón recto 2XL', 'caballeros', 'talla grande', 'Perfecto ajuste.', 'cab_tg3.jpg', 33.00, 12),
('Sudadera ancha', 'caballeros', 'talla grande', 'Estilo urbano XL.', 'cab_tg4.jpg', 29.50, 15),
('Short grande algodón', 'caballeros', 'talla grande', 'Fresco y cómodo.', 'cab_tg5.jpg', 19.99, 20),
('Chaqueta grande XL', 'caballeros', 'talla grande', 'Para clima frío.', 'cab_tg6.jpg', 39.00, 8),
('Jeans talla grande', 'caballeros', 'talla grande', 'Corte clásico cómodo.', 'cab_tg7.jpg', 35.99, 10);

-- CABALLEROS - TRAJES Y BLAZER
INSERT INTO productos (nombre, categoria, subcategoria, descripcion, imagen, precio, stock) VALUES
('Blazer formal negro', 'caballeros', 'trajes y blazer', 'Elegancia total.', 'cab_blz1.jpg', 60.00, 6),
('Traje gris completo', 'caballeros', 'trajes y blazer', 'Incluye saco y pantalón.', 'cab_blz2.jpg', 95.00, 5),
('Blazer azul marino', 'caballeros', 'trajes y blazer', 'Para eventos y oficina.', 'cab_blz3.jpg', 62.50, 8),
('Saco deportivo casual', 'caballeros', 'trajes y blazer', 'Diseño relajado.', 'cab_blz4.jpg', 49.99, 10),
('Blazer entallado', 'caballeros', 'trajes y blazer', 'Moderno y ajustado.', 'cab_blz5.jpg', 58.00, 6),
('Traje slim fit', 'caballeros', 'trajes y blazer', 'Ajuste profesional.', 'cab_blz6.jpg', 98.00, 4),
('Saco gris claro', 'caballeros', 'trajes y blazer', 'Versátil y elegante.', 'cab_blz7.jpg', 55.00, 7);

-- CUIDADO DE LA PIEL
INSERT INTO productos (nombre, categoria, subcategoria, descripcion, imagen, precio, stock) VALUES
('Crema corporal hidratante', 'belleza y cuidado', 'cuidado de la piel', 'Hidrata profundamente.', 'piel1.jpg', 12.99, 20),
('Loción de avena', 'belleza y cuidado', 'cuidado de la piel', 'Suaviza piel sensible.', 'piel2.jpg', 10.50, 15),
('Manteca de karité', 'belleza y cuidado', 'cuidado de la piel', 'Nutrición intensiva.', 'piel3.jpg', 13.75, 12),
('Aceite nutritivo', 'belleza y cuidado', 'cuidado de la piel', 'Mejora elasticidad.', 'piel4.jpg', 14.99, 10),
('Gel post solar', 'belleza y cuidado', 'cuidado de la piel', 'Alivia irritaciones.', 'piel5.jpg', 9.99, 25);

-- CUIDADO DEL ROSTRO
INSERT INTO productos (nombre, categoria, subcategoria, descripcion, imagen, precio, stock) VALUES
('Sérum vitamina C', 'belleza y cuidado', 'cuidado del rostro', 'Ilumina el rostro.', 'rostro1.jpg', 17.99, 10),
('Tónico facial', 'belleza y cuidado', 'cuidado del rostro', 'Refresca y equilibra.', 'rostro2.jpg', 13.00, 12),
('Mascarilla de arcilla', 'belleza y cuidado', 'cuidado del rostro', 'Limpieza profunda.', 'rostro3.jpg', 14.00, 15),
('Exfoliante suave', 'belleza y cuidado', 'cuidado del rostro', 'Remueve impurezas.', 'rostro4.jpg', 12.00, 20),
('Contorno de ojos', 'belleza y cuidado', 'cuidado del rostro', 'Reduce ojeras y bolsas.', 'rostro5.jpg', 16.00, 10);

-- MAQUILLAJE
INSERT INTO productos (nombre, categoria, subcategoria, descripcion, imagen, precio, stock) VALUES
('Base líquida', 'belleza y cuidado', 'maquillaje', 'Cobertura media.', 'maq1.jpg', 18.00, 12),
('Rímel negro volumen', 'belleza y cuidado', 'maquillaje', 'Realza pestañas.', 'maq2.jpg', 11.50, 20),
('Labial mate', 'belleza y cuidado', 'maquillaje', 'Color duradero.', 'maq3.jpg', 9.99, 25),
('Paleta sombras nude', 'belleza y cuidado', 'maquillaje', 'Tonos combinables.', 'maq4.jpg', 19.99, 10),
('Rubor rosado', 'belleza y cuidado', 'maquillaje', 'Aporta frescura.', 'maq5.jpg', 10.00, 18);

-- MANOS Y UÑAS
INSERT INTO productos (nombre, categoria, subcategoria, descripcion, imagen, precio, stock) VALUES
('Esmalte rojo', 'belleza y cuidado', 'manos y uñas', 'Color intenso.', 'uñas1.jpg', 5.99, 30),
('Crema de manos', 'belleza y cuidado', 'manos y uñas', 'Hidratación inmediata.', 'uñas2.jpg', 6.50, 25),
('Kit manicura', 'belleza y cuidado', 'manos y uñas', 'Completo para el cuidado.', 'uñas3.jpg', 12.00, 15),
('Removedor sin acetona', 'belleza y cuidado', 'manos y uñas', 'Suave con tus uñas.', 'uñas4.jpg', 4.99, 20),
('Aceite para cutículas', 'belleza y cuidado', 'manos y uñas', 'Hidratación intensiva.', 'uñas5.jpg', 7.00, 18);

-- CUIDADO DEL CABELLO
INSERT INTO productos (nombre, categoria, subcategoria, descripcion, imagen, precio, stock) VALUES
('Shampoo nutritivo', 'belleza y cuidado', 'cuidado del cabello', 'Con aceite de argán.', 'cabello1.jpg', 10.50, 20),
('Mascarilla de coco', 'belleza y cuidado', 'cuidado del cabello', 'Reparación profunda.', 'cabello2.jpg', 13.99, 15),
('Spray térmico', 'belleza y cuidado', 'cuidado del cabello', 'Protege del calor.', 'cabello3.jpg', 12.50, 12),
('Crema para rizos', 'belleza y cuidado', 'cuidado del cabello', 'Define sin frizz.', 'cabello4.jpg', 10.75, 20),
('Aceite multiuso', 'belleza y cuidado', 'cuidado del cabello', 'Brillo y nutrición.', 'cabello5.jpg', 14.50, 10);

-- ACCESORIOS DE BELLEZA
INSERT INTO productos (nombre, categoria, subcategoria, descripcion, imagen, precio, stock) VALUES
('Set de brochas', 'belleza y cuidado', 'accesorios de belleza', '7 piezas básicas.', 'acc_belleza1.jpg', 16.99, 12),
('Esponja blender', 'belleza y cuidado', 'accesorios de belleza', 'Aplicación uniforme.', 'acc_belleza2.jpg', 5.50, 30),
('Pinza para cejas', 'belleza y cuidado', 'accesorios de belleza', 'Precisión total.', 'acc_belleza3.jpg', 4.99, 18),
('Organizador maquillaje', 'belleza y cuidado', 'accesorios de belleza', 'Todo en su lugar.', 'acc_belleza4.jpg', 12.00, 10),
('Cinta para maquillaje', 'belleza y cuidado', 'accesorios de belleza', 'Ideal para rutina facial.', 'acc_belleza5.jpg', 6.99, 20);

-- BAÑO Y DUCHAS
INSERT INTO productos (nombre, categoria, subcategoria, descripcion, imagen, precio, stock) VALUES
('Gel de baño lavanda', 'belleza y cuidado', 'baño y duchas', 'Relajante y aromático.', 'ducha1.jpg', 9.99, 15),
('Sales de baño', 'belleza y cuidado', 'baño y duchas', 'Relaja cuerpo y mente.', 'ducha2.jpg', 11.50, 10),
('Aceite de ducha', 'belleza y cuidado', 'baño y duchas', 'Hidratación instantánea.', 'ducha3.jpg', 10.50, 12),
('Jabón líquido', 'belleza y cuidado', 'baño y duchas', 'Aroma suave.', 'ducha4.jpg', 7.99, 18),
('Jabón avena natural', 'belleza y cuidado', 'baño y duchas', 'Piel sensible.', 'ducha5.jpg', 6.50, 20);


-- FRAGANCIAS
INSERT INTO productos (nombre, categoria, subcategoria, descripcion, imagen, precio, stock) VALUES
('Perfume floral mujer', 'fragancias', '', 'Aroma suave y elegante.', 'frag1.jpg', 29.99, 15),
('Colonia fresca hombre', 'fragancias', '', 'Notas cítricas y limpias.', 'frag2.jpg', 27.50, 18),
('Body Mist frutal', 'fragancias', '', 'Ligero para el uso diario.', 'frag3.jpg', 15.99, 20),
('Perfume intenso noche', 'fragancias', '', 'Ideal para ocasiones especiales.', 'frag4.jpg', 39.99, 12),
('Colonia juvenil unisex', 'fragancias', '', 'Estilo moderno y casual.', 'frag5.jpg', 19.99, 25);
select * from usuarios