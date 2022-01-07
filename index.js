const express = require('express');

const app = express();
const port = 3000;

app.use(express.static('static'));

app.get('/bricks/root', (req, res) => {
    res.json({
        html: '<div class="brick-root"><div class="brick-label">{{label}}</div><div class="brick-input-wrapper"> <!-- input --> </div><div class="brick-helper-text">{{helperText}}</div></div>',
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
