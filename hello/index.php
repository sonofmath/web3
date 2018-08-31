<?php

include "myLib/Generator.php";
$name = "JR";
$names = array("alice", "bob", "cindy");


function sayHi(&$who) {
    echo "<br>Hi $who!\n";
    $who = "nobody";
}



class Page extends myLib\Generator {
    public function header() {
        echo "<html><title>No Title</title>";
    }
    public function footer() {
        echo "</html>";
    }
    public function body() {
        echo "<body>this is the body</body>";
    }
    function generate() {
        $this->header();
        $this->body();
        $this->footer();
    }
}

$page = new Page();
$page->generate();
?>

<html>
    Hi, <?php echo $name ?>!
</br>
    Hi, 
    <?php 
    foreach ($names as $name) {
        echo "<br>$name\n";
    }
    ?>
</html>
