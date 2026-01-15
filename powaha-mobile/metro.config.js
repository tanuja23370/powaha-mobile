const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Disable expo-updates completely
config.resolver.blacklistRE = /expo-updates/;
config.resolver.blockList = [/expo-updates/];

module.exports = config;
