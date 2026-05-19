INSERT INTO users (name, email, password) VALUES
('Juan Pérez', 'juan@gmail.com', '1234'),
('María López', 'maria@gmail.com', '5678'),
('Carlos Rodríguez', 'carlos@gmail.com', 'abcd');

INSERT INTO products (name, price, description, stock) VALUES
('Laptop', 1500.00, 'Laptop 15 pulgadas 16GB RAM', 10),
('Mouse', 25.00, 'Mouse inalámbrico', 50),
('Teclado', 45.00, 'Teclado mecánico', 30);

INSERT INTO orders (user_id, product_id, quantity, total) VALUES
(1, 1, 1, 1500.00),
(2, 2, 2, 50.00),
(3, 3, 1, 45.00);