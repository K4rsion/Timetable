import { navigate } from 'wouter/use-location';

// Создаем обертку над navigate для удобного использования
const customHistory = {
  push: (path: string) => navigate(path),
  replace: (path: string) => navigate(path, { replace: true }),
  goBack: () => window.history.back(),
  goForward: () => window.history.forward(),
};

export default customHistory;
