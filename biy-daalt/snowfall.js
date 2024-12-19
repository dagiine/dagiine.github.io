const snowContainer = document.querySelector('.snow-container');
const totalSnowflakes = 50;

for (let i = 0; i < totalSnowflakes; i++) {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');

    const img = document.createElement('img');
    img.src = 'snow.png';
    img.alt = 'Snowflake';
    snowflake.appendChild(img);

    snowflake.style.setProperty('--start-pos', Math.random() * 100 + '%');
    snowflake.style.setProperty('--end-pos', Math.random() * 100 + '%');

    snowflake.style.animationDuration = Math.random() * 4 + 3 + 's';

    snowContainer.appendChild(snowflake);
}