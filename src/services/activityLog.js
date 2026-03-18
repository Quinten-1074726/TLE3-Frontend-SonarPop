const STORAGE_KEY = "dashboard_activity_log";

function readLog() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = JSON.parse(raw || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeLog(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function getActivityLog() {
  return readLog();
}

export function addActivityLogItem(item) {
  const items = readLog();

  const nextItem = {
    id: crypto.randomUUID(),
    type: item.type || "info",
    title: item.title || "Onbekende actie",
    description: item.description || "",
    source: item.source || "dashboard",
    timestamp: item.timestamp || new Date().toISOString(),
  };

  const nextItems = [nextItem, ...items].slice(0, 100);
  writeLog(nextItems);

  return nextItem;
}

export function clearActivityLog() {
  writeLog([]);
}