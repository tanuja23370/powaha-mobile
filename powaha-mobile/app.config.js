module.exports = {
  expo: {
    name: "Powaha",
    slug: "powaha-mobile-dev",

    scheme: "powaha",
    
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",

    splash: {
      image: "./assets/images/splash-icon1.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },

    android: {
      package: "com.tanuja.powaha",
    },

    extra: {
      eas: {
        projectId: "2fae7bab-06ae-459f-a2f9-3ce5790edb04",
      },
    },
  },
};
