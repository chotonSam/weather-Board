import { useEffect, useState } from "react";

const useLocationEnabled = () => {
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);

  useEffect(() => {
    if ("geolocation" in navigator && "permissions" in navigator) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((permissionStatus) => {
          // Set initial status
          setIsLocationEnabled(permissionStatus.state === "granted");

          // Listen for changes to the permission status
          permissionStatus.onchange = () => {
            setIsLocationEnabled(permissionStatus.state === "granted");
          };
        })
        .catch(() => {
          setIsLocationEnabled(false);
        });
    } else {
      setIsLocationEnabled(false);
    }
  }, []);

  return isLocationEnabled;
};

export default useLocationEnabled;
