<script lang="ts"></script>

<section class="typography-color-palette-page">
    <h1>Typography and Color Palette</h1>

    <h1>Headers h1</h1>
    <h2>Headers h2</h2>
    <h3>Headers h3</h3>
    <h4>Headers h4</h4>
    <h5>Headers h5</h5>
    <h6>Headers h6</h6>
    <p>This is a sample paragraph to demonstrate the text styling.</p>

    <h2>Color Palette</h2>

    <div class="colors-light-dark">
        <div class="colors-light">
            <h3>Light Mode</h3>
            <div class="colors primary">
                <div class="color-box background-primary-1-light">
                    Primary Background 1 light
                </div>
                <div class="color-box background-primary-2-light">
                    Primary Background 2 light
                </div>
                <div class="color-box background-primary-3-light">
                    Primary Background 3 light
                </div>
            </div>
            <div class="colors primary">
                <div class="color-box color-primary-1-light">
                    Primary Color 1 light
                </div>
                <div class="color-box color-primary-2-light">
                    Primary Color 2 light
                </div>
                <div class="color-box color-primary-3-light">
                    Primary Color 3 light
                </div>
            </div>
            <div class="colors accent">
                <div class="color-box color-accent-1-light">
                    Accent Color 1 light
                </div>
                <div class="color-box color-accent-2-light">
                    Accent Color 2 light
                </div>
                <div class="color-box color-accent-3-light">
                    Accent Color 3 light
                </div>
            </div>
        </div>

        <div class="colors-dark">
            <h3>Dark Mode</h3>
            <div class="colors primary">
                <div class="color-box background-primary-1-dark">
                    Primary Background 1 dark
                </div>
                <div class="color-box background-primary-2-dark">
                    Primary Background 2 dark
                </div>
                <div class="color-box background-primary-3-dark">
                    Primary Background 3 dark
                </div>
            </div>
            <div class="colors primary">
                <div class="color-box color-primary-1-dark">
                    Primary Color 1 dark
                </div>
                <div class="color-box color-primary-2-dark">
                    Primary Color 2 dark
                </div>
                <div class="color-box color-primary-3-dark">
                    Primary Color 3 dark
                </div>
            </div>

            <div class="colors accent">
                <div class="color-box color-accent-1-dark">
                    Accent Color 1 dark
                </div>
                <div class="color-box color-accent-2-dark">
                    Accent Color 2 dark
                </div>
                <div class="color-box color-accent-3-dark">
                    Accent Color 3 dark
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    .typography-color-palette-page {
        padding: 50px 20px;
        justify-self: center;
    }
    .colors-light-dark {
        display: flex;
        gap: 50px;
        width: 100%;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .colors-light,
    .colors-dark {
        display: flex;
        flex-direction: column;
        gap: 5px;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }
    .primary,
    .accent {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 5px;
    }

    .color-box {
        width: 180px;
        height: 180px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 10px;
        font-weight: bold;
        font-size: 0.9rem;
        border-radius: 8px;
        color: var(--color-primary);
        text-align: center;
        border: 1px solid var(--color-primary-3);
        padding: 10px;
        box-sizing: border-box;
    }
    .color-primary-1-light {
        background-color: var(--color-primary-1-light);
        color: var(--background-primary-1-light);
    }
    .color-primary-2-light {
        background-color: var(--color-primary-2-light);
        color: var(--background-primary-1-light);
    }
    .color-primary-3-light {
        background-color: var(--color-primary-3-light);
        color: var(--background-primary-1-light);
    }
    .color-primary-1-dark {
        background-color: var(--color-primary-1-dark);
        color: var(--background-primary-1-dark);
    }
    .color-primary-2-dark {
        background-color: var(--color-primary-2-dark);
        color: var(--background-primary-1-dark);
    }
    .color-primary-3-dark {
        background-color: var(--color-primary-3-dark);
        color: var(--background-primary-1-dark);
    }
    .color-accent-1-light {
        background-color: var(--color-accent-1-light);
        color: var(--background-primary-1-dark);
    }
    .color-accent-2-light {
        background-color: var(--color-accent-2-light);
        color: var(--background-primary-2-dark);
    }
    .color-accent-3-light {
        background-color: var(--color-accent-3-light);
        color: var(--background-primary-3-dark);
    }
    .color-accent-1-dark {
        background-color: var(--color-accent-1-dark);
        color: var(--background-primary);
    }
    .color-accent-2-dark {
        background-color: var(--color-accent-2-dark);
        color: var(--background-primary);
    }
    .color-accent-3-dark {
        background-color: var(--color-accent-3-dark);
        color: var(--background-primary);
    }
    .background-primary-1-light {
        background-color: var(--background-primary-1-light);
        color: var(--color-primary-1-light);
    }
    .background-primary-2-light {
        background-color: var(--background-primary-2-light);
        color: var(--color-primary-1-light);
    }
    .background-primary-3-light {
        background-color: var(--background-primary-3-light);
        color: var(--color-primary-1-light);
    }
    .background-primary-1-dark {
        background-color: var(--background-primary-1-dark);
        color: var(--color-primary-1-dark);
    }
    .background-primary-2-dark {
        background-color: var(--background-primary-2-dark);
        color: var(--color-primary-1-dark);
    }
    .background-primary-3-dark {
        background-color: var(--background-primary-3-dark);
        color: var(--color-primary-1-dark);
    }
</style>
