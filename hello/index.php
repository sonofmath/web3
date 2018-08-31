<?php

require_once "myLib/Page.php";

class ThisPage extends myLib\Page {
    public function title() { 
        echo "Home Page";
    }

    public function content() {
        echo "Main Content";
    }
}

$page = new ThisPage();
$page->generate();
?>