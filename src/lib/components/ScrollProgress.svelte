<div class="reading-indicator-bar"></div>
<style lang="scss">
    section {
        width: 100%;
        height: 100%;
        position: relative;
        
    }
    /* Reading indicator */
    .reading-indicator-bar {
        position:sticky;
        top:0;
        height:6px;
        width:100%;
        transition: all 1s ease-in-out;
        animation: reading-indicator linear forwards;
        animation-timeline: scroll( nearest y );
        transform-origin: left;
        z-index: 9999;
    }
    @keyframes reading-indicator{
        from {
            transform:scaleX(0);
            background-color:#3498db;
        }
        10% {
            transform:scaleX(10%);
            background-color:tomato;
        }
        20% {
            transform:scaleX(20%);
            background-color: #2ecc71;
        }
        30% {
            transform:scaleX(30%);
            background-color: #9b59b6;
        }
        40% {
            transform:scaleX(40%);
            background-color: #e67e22;
        }
        50% {
            transform:scaleX(50%);
            background-color: #f1c40f;
        }
        60% {
            transform:scaleX(60%);
            background-color: #1abc9c;
        }
        70% {
            transform:scaleX(70%);
            background-color: #34495e;
        }
        80% {
            transform:scaleX(80%);
            background-color: #e74c3c;
        }
        90% {   
            transform:scaleX(90%);
            background-color: #8e44ad;
        }
        to {
            transform:scaleX(1);
            background-color:#791858;
        }
    }
</style>