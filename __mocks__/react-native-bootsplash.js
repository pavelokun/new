//https://github.com/zoontek/react-native-bootsplash/issues/152#issuecomment-733903511
const reactNativeBootsplashMock = {
  hide: jest.fn().mockResolvedValueOnce(),
  show: jest.fn().mockResolvedValueOnce(),
  getVisibilityStatus: jest.fn().mockResolvedValue('hidden'),
};

export default reactNativeBootsplashMock;
