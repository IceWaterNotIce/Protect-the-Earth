

export function findDeviceType(){
  let deviceType = '';
  if (/Mobi|Android/i.test(navigator.userAgent)) {
    // Mobile device
    deviceType = 'Mobile';
  } else if (/iPad|Android|Tablet/i.test(navigator.userAgent)) {
    // Tablet device
    deviceType = 'Tablet';
  } else {
    // Desktop or other device
    deviceType = 'Desktop';
  }
  return deviceType;
}



