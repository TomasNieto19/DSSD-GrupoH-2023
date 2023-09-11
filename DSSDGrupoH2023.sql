create database DSSDGrupoH2023;

use DSSDGrupoH2023;

CREATE TABLE `users` (
    `id_user` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id_user`)
);

CREATE TABLE `recipe` (
    `id_recipe` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `ingredients` VARCHAR(7500) NOT NULL,
    `category` VARCHAR(255) NOT NULL,
    `steps` VARCHAR(7500) NOT NULL,
    `preparation_time` INT NOT NULL,
    `id_user` INT NOT NULL,
    PRIMARY KEY (`id_recipe`),
    FOREIGN KEY (id_user)
        REFERENCES users (id_user)
);

CREATE TABLE `photo` (
    `id_photo` INT NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(16000) NOT NULL,
    `id_recipe` INT NOT NULL,
    PRIMARY KEY (`id_photo`),
    FOREIGN KEY (`id_recipe`)
        REFERENCES `recipe` (`id_recipe`)
);

CREATE TABLE `follows` (
    `id_follower` INT NOT NULL,
    `id_following` INT NOT NULL,
    FOREIGN KEY (id_follower)
        REFERENCES users (id_user),
    FOREIGN KEY (id_following)
        REFERENCES users (id_user),
    PRIMARY KEY (id_follower , id_following)
);

INSERT INTO users (name, email, username, password) VALUES
  ('Usuario1', 'usuario1@gmail.com', 'admin', '1234'),
  ('Usuario2', 'usuario2@gmail.com', 'user', '1234');

  INSERT INTO recipe (title, description, ingredients, category, steps, preparation_time, id_user) VALUES
  ('Galletas veganas de chocolate',
   'Cookies veganas de textura suave con sabor a chocolate, aroma a naranja y chispas de chocolate negro que se derriten en tu boca.',
   '250 g de harina de trigo\n50 g de cacao en polvo\n140 g de margarina vegetal\n100 g de azúcar blanco\n100 g de azúcar moreno\n½ cucharita de levadura en polvo\nPiel de 4 naranjas\n100 ml de zumo de naranja\n200 g de chocolate negro en barra',
   'Veganas',
   'Corta la barra de chocolate negro en pedazos.\nMezcla la margarina con ambos azúcares y la piel de naranja.\nAgrega el zumo de naranja y poco a poco harina, levadura y cacao en polvo.\nAñade los trocitos de chocolate.\nGuarda la masa en la nevera al menos media hora.\nCoge una cucharada de masa y con la ayuda del dedo o de otra cuchara deja caerla encima de una bandeja de horno.\nHornea durante 20-25 minutos a 180º.',
   50,
   1),
  ('Flan',
   'Flan casero argentino',
   '8 huevos\n350 gr. azúcar\n1 litro leche\n1 cucharada esencia de vainilla',
   'Postres',
   '1. Precalienta el horno a 180°C.\n2. En una cacerola, carameliza 150 gramos de azúcar hasta obtener un caramelo dorado y vierte el caramelo en un molde para flan.\n3. En un bol, bate los huevos, el resto del azúcar y la esencia de vainilla.\n4. Calienta la leche hasta que esté tibia y agrégala a la mezcla de huevos mientras sigues batiendo.\n5. Vierte la mezcla en el molde con el caramelo.\n6. Coloca el molde en una fuente con agua caliente hasta la mitad del molde.\n7. Hornea durante aproximadamente 50-60 minutos o hasta que el flan esté firme y dorado en la superficie.\n8. Deja enfriar a temperatura ambiente y luego refrigera durante al menos 2 horas antes de desmoldar.\n9. Sirve el flan frío y disfruta.',
   75,
   2),
   ('Empanadas argentinas de carne',
   'Empanada regional',
   '450 g de harina de trigo\n10 g de sal\n1 yema de huevo\n200 ml de agua templada\n50 g de manteca\n1 kg de carne',
   'Regionales',
   '1. En un bol, mezcla la harina de trigo y la sal.\n2. Agrega la yema de huevo y el agua templada. Mezcla hasta obtener una masa suave y elástica.\n3. Deja reposar la masa en un lugar cálido durante 30 minutos.\n4. Mientras tanto, cocina la carne en una sartén con un poco de aceite hasta que esté dorada y bien cocida. Puedes condimentarla a tu gusto.\n5. Divide la masa en pequeñas bolas y estíralas con un rodillo para formar círculos del tamaño de empanadas.\n6. Coloca una porción de carne en el centro de cada círculo de masa.\n7. Doble la masa por la mitad sobre el relleno y presiona los bordes con un tenedor para sellar las empanadas.\n8. Precalienta el horno a 180°C.\n9. Coloca las empanadas en una bandeja para horno y píntalas con la manteca derretida.\n10. Hornea durante aproximadamente 20-25 minutos o hasta que estén doradas y crujientes.\n11. Sirve las empanadas calientes y disfruta.',
   75,
   2),
   ('Milanesas de ternera',
   'Regionales',
   '4 filetes grandes de ternera para empanar\n300 g de pan rallado\n2 huevos\nUn puñado de perejil (opcional)\n1 diente de ajo (opcional)\nAceite de girasol para freír',
   'Regionales',
   '1. Cortar los filetes por la mitad si fuera necesario y retirar el exceso de grasa.\n2. Picar el perejil y el ajo lo más pequeño posible.\n3. Batir los huevos en un plato hondo y añadir perejil, ajo, sal y pimienta.\n4. En un plato llano, colocar el pan rallado.\n5. Pasar los filetes por pan, luego por huevo, y nuevamente por pan.\n6. Calentar abundante aceite en una sartén u olla ancha.\n7. Freír las milanesas por ambos lados hasta que estén doradas. Una vez listas, colocar sobre un papel absorbente.',
   50,
   1);

INSERT INTO photo (url, id_recipe) VALUES
("https://i.imgur.com/I1SyBTh.jpeg", 1),
("https://i.imgur.com/d2F6BCW.jpeg", 1),
("https://i.imgur.com/s8z6wDy.jpeg", 2),
("https://i.imgur.com/CiXw8oo.jpeg", 2), 
("https://i.imgur.com/aikou9b.jpeg", 3),
("https://i.imgur.com/JTNYjR5.jpeg", 3), 
("https://i.imgur.com/JS5eg4D.jpeg", 4),
("https://i.imgur.com/Hf2Th3u.jpeg", 4);

INSERT INTO follows (id_follower, id_following) VALUES
(1,2),
(2,1);