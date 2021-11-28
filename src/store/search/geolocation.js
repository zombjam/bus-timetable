const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

const geolocation = async () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const userLocation = [position.coords.latitude, position.coords.longitude];
          resolve(userLocation);
          // resolve([23.382, 121.035]);
        },
        error => {
          reject('無法檢索您的位置。');
        },
        options
      );
    } else {
      reject('您的瀏覽器不支援地理定位功能');
    }
  });
};

export default geolocation;
