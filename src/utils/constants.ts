const FORM_LAYOUT = {
    default: {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 },
    }
};

const WEEK_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const SAFE_ARE = {
    TOP: 'var(--safe-area-inset-top, env(safe-area-inset-top))',
    RIGHT: 'var(--safe-area-inset-right, env(safe-area-inset-right))',
    BOTTOM: 'var(--safe-area-inset-bottom, env(safe-area-inset-bottom))',
    LEFT: 'var(--safe-area-inset-left, env(safe-area-inset-left))',
};

const INITIAL_LECTURE = [{ "code": "CENG204", "title": "COMPUTER ORGANIZATION", "backgroundColor": "#4dd0e1", "id": "1662581486975" }, { "backgroundColor": "#9c27b0", "title": "Mobile Application Development", "code": "CENG427", "id": "1662581512356" }, { "code": "ENGR402", "title": "System Dynamics And Control", "backgroundColor": "#f44336", "id": "1662581546108" }, { "code": "CENG316", "title": "Parallel Programming", "backgroundColor": "#3f51b5", "id": "1662581578742" }, { "code": "CENG466", "title": "Management Information Systems ", "backgroundColor": "#009688", "id": "1662581607803" }, { "code": "ENGR256", "title": "Statistics for Computer Engineering", "backgroundColor": "#ffc107", "id": "1662581649925" }, { "code": "CENG317", "title": "Artificial Intelligence", "backgroundColor": "#ff5722", "id": "1662581676311" }, { "code": "CENG474", "title": "Communication and Network Security", "backgroundColor": "#795548", "id": "1662581705346" }]
const INITIAL_VALUES = [null, null, [null, "1662581607803", "1662581546108", null, "1662581578742"], [null, "1662581607803", "1662581546108", null, "1662581578742", "1662581676311"], [null, null, "1662581486975", null, "1662581578742", "1662581676311"], [null, null, "1662581486975", null, null, "1662581676311"], [null, "1662581486975", "1662581512356", "1662581546108", "1662581607803", "1662581705346"], [null, "1662581486975", "1662581512356", "1662581546108", "1662581607803", "1662581705346"], [null, "1662581486975", "1662581512356", null, "1662581649925", "1662581705346"], [null, null, null, null, "1662581649925"]]


export { FORM_LAYOUT, WEEK_DAYS, SAFE_ARE, INITIAL_LECTURE, INITIAL_VALUES };

