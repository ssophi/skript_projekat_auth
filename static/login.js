function init() {
        
    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();
        console.log("saljem post na 9000")
        const data = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        };
        
        console.log(JSON.stringify(data));

        fetch('http://127.0.0.1:9000/login/zaposleni', {
            method: 'POST',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if (el.msg) {
                    alert(el.msg);
                } else {
                    document.cookie = `token=${el.token};SameSite=Lax`;
                    console.log('kuki je ', document.cookie);
                    window.location.href = 'index.html';
                }
            });
    });
}