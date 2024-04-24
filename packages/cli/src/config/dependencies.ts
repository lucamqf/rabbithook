export const hookDependencies: Record<string, string[]> = {
  "use-hover": ["use-event-listener"],
  "use-is-supported": ["use-mount"],
  "use-async": ["use-is-supported"],
  "use-key-stroke": ["use-event-listener"],
  "use-long-press": ["use-event-listener", "use-timeout"],
  "use-online-status": ["use-event-listener"],
  "use-orientation": ["use-event-listener"],
  "use-window-size": ["use-event-listener"],
  "use-fetch": ["use-async"],
};