export default (() => {
    return `
    <div class="kasten">
        <div class="status">
            <p></p>
            <p></p>
        </div>
        <div class="item">
            <div class="content rotate">
                <div class="front"><p></p></div>
                <div class="behind"><p></p></div>
                <div class="listName"></div>
            </div>
        </div>
        <div class="buttons noselect">
            <div><div class="wrong m-icon">close</div></div>
            <div><div class="toggleTurn m-icon">cached</div></div>
            <div><div class="right m-icon">done</div></div>
        </div>
        <div class="balken"></div>
    </div>
    `
})();