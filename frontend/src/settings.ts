export type settingsType = { ip: string; wifi: string; pwd: string };

// eslint-disable-next-line
const casa: settingsType = {
	ip: "192.168.0.112",
	wifi: "(di casa)",
	pwd: "(la sapete)"
};

// eslint-disable-next-line
const usageRouter: settingsType = {
	ip: "192.168.0.100",
	wifi: "giocone",
	pwd: "giocone123"
};

export default usageRouter;
