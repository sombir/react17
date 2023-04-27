jest.mock('axios', () => {
  return {
    create: jest.fn(() => ({
      get: jest.fn(),
      interceptors: {
        request: { use: jest.fn(), eject: jest.fn() },
        response: { use: jest.fn(), eject: jest.fn() }
      }
    })),
    CancelToken: {
      source: () => {
        return {
          token: {
            promise: new Promise(jest.fn())
          },
          cancel: jest.fn()
        };
      }
    },
    isCancel: jest.fn()
  };
});

// Mocking charts
const originalGetComputedTextLength = SVGElement.prototype.getComputedTextLength;

// The actual observe handler would not be called in jsdom anyways as no resize would be triggered.
beforeEach(() => {
  Object.defineProperty(global, 'ResizeObserver', {
    writable: true,
    value: jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn()
    }))
  });

  SVGElement.prototype.getComputedTextLength = () => {
    return 150;
  };
});

// Scroll view is not implemented in jsdom as there's no real browser interaction
window.HTMLElement.prototype.scrollIntoView = jest.fn();

// ScrollTo is not implemented in jsdom as there's no real browser interaction
Object.assign(global, global, {
  scrollTo: jest.fn()
});

afterEach(() => (SVGElement.prototype.getComputedTextLength = originalGetComputedTextLength));
