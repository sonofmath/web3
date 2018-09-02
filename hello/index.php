<?php

require_once "myLib/Page.php";

class ThisPage extends myLib\Page {
    
    public function content() {
        echo "<div>
                <header>
                    <h1>Hello World</h1>
                </header>
            </div>";
    }
}

$page = new ThisPage();
$page->generate();
?>