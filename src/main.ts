import { MessageService } from './MessageService';
import { createRateLimitProxy } from './RateLimitProxy';

const messageService = new MessageService();
// Обмежуємо відправку до 1 повідомлення в секунду
const service = createRateLimitProxy(messageService, 1000);

console.log("Тестуємо систему анти-спаму:");
service.send("Привіт! Як справи?");
// Спроба спаму - буде заблоковано
service.send("Чому не відповідаєш?");

// Чекаємо секунду і надсилаємо знову
setTimeout(() => {
    service.send("Це повідомлення вже пройде, бо ми почекали 1 секунду");
}, 1100); 