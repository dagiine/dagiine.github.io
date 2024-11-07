var num = parseInt(
  window.prompt("Тоо оруул:", 0)
);

var sum = 0;
var temp = num;
while (temp > 0) {
  sum += temp % 10;
  temp = Math.floor(temp / 10);
}

function isPalindrome(num) {
  var reversed = 0;
  var original = num;

  while (num > 0) {
    reversed = reversed * 10 + (num % 10);
    num = Math.floor(num / 10);
  }

  return original === reversed;
}

if (isPalindrome(sum)) {
  document.write("Цифрүүдийн нийлбэр нь палиндром байна: " + sum);
} else {
  document.write("Цифрүүдийн нийлбэр нь палиндром биш байна: " + sum);
}
