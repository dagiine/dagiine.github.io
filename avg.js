var sum = 0;
var ctr = 0; // сурагчийн тоо
var temp = window.prompt(
  "Дүн оруул. Хэрвээ дүнгээ оруулж дууссан бол -1ийг оруул: ",
  0
);
temp = parseFloat(temp);
while (temp !== -1) {
  sum += temp;
  ctr++;
  temp = window.prompt(
    "Дүн оруул. Хэрвээ дүнгээ оруулж дууссан бол -1ийг оруул: ",
    0
  );
  temp = parseFloat(temp);
}
document.write("Дундаж дүн: " + sum / ctr);
