function showNotification(message, timer) {
  const notificationContainer = document.getElementById(
    'notification-container'
  );
  const notificationText = document.getElementById('notification-text');

  // Set the notification text
  notificationText.innerText = message;

  // Show notification container
  notificationContainer.classList.remove('hidden');

  // Hide the notification after a few seconds
  setTimeout(() => {
    notificationContainer.classList.add('hidden');
  }, timer);
}

module.exports = showNotification;
