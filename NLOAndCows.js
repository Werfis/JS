let flying_nlo = {};
let cows = [];
let score = 0;

function setup() {
    createCanvas(1000, 1000);
    frameRate(20);
    noStroke();
  
    flying_nlo = {
        x: 600,
        y: 400,
        width: 250,
        height: 100,
        color_1: '#AFF0F0',
        color_2: '#969696',
        neg_y_move: -1,
        pos_y_move: 1,
        neg_x_move: -2,
        pos_x_move: 2,
        
        draw_signal: function() {
            fill(255);
            for (let i = 0; i < 10; i++)
                circle(this.x - this.width / 2 + i * 27, this.y, 10);
        },

        change_pos: function() {
            this.x += random(this.neg_x_move, this.pos_x_move);
            this.y += random(this.neg_y_move, this.pos_y_move);
        },

        draw_fly: function() {
            fill(this.color_1);
            arc(this.x, this.y - this.height / 2, this.width / 2, this.height, PI, TWO_PI);
            fill(this.color_2);
            arc(this.x, this.y, this.width, this.height + 10, PI, TWO_PI);
            fill(50);
            arc(this.x, this.y, this.width, this.height / 2, 0, PI);
            this.draw_signal();  
        },

        beam: function() {
            fill(255, 255, 100, 150);
            beginShape();
            vertex(this.x - this.width / 4, this.y + 10);
            vertex(this.x + this.width / 4, this.y + 10);
            vertex(this.x + this.width, height - 100);
            vertex(this.x - this.width, height - 100);
            endShape();
        }
    };

    for (let i = 0; i < 5; i++) {
        spawnCow();
    }
}

function spawnCow() {
    let cow = {
        x: random(50, width - 50),
        y: height - 150,
        width: 50,
        height: 50,
        speed: random(1, 3),
        direction: random([-1, 1])
    };
    cows.push(cow);
}

function updateCows() {
    for (let i = cows.length - 1; i >= 0; i--) {
        let cow = cows[i];
        cow.x += cow.speed * cow.direction;

        if (cow.x < 0 || cow.x > width - cow.width) {
            cow.direction *= -1;
        }

        if (isCowCaught(cow)) {
            score++;
            cows.splice(i, 1);
            spawnCow();
        }
    }
}

function draw() {
    background(50, 100, 80);
    
    fill(0, 50, 0);
    rect(0, height - 100, width, 100);

    flying_nlo.change_pos();
    flying_nlo.draw_fly();
    flying_nlo.beam();

    fill(255);
    for (let cow of cows) {
        rect(cow.x, cow.y, cow.width, cow.height);
    }

    updateCows();
    
    fill(255);
    textSize(24);
    text("Счёт: " + score, 10, 30);
}

function isCowCaught(cow) {
    return (cow.x + cow.width > flying_nlo.x - flying_nlo.width / 4 &&
            cow.x < flying_nlo.x + flying_nlo.width / 4 &&
            cow.y + cow.height > flying_nlo.y + 10 &&
            cow.y < height - 100);
}