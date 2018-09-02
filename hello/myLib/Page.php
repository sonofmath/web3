<?php

namespace myLib;

require_once "Generator.php";

class Page extends Generator {
    public function doctype() {
        echo "<!DOCTYPE html>\n";
    }

    public function page() {
        $this->doctype();
        $this->html();
    }

    public function html() {
        echo "<html>\n";
        $this->head();
        $this->body();
        echo "</html>\n";
    }

    public function head() {
        echo "<head>\n";
        echo "<meta charset=\"UTF-8\">\n";
        $this->title();
        echo "</head>\n";
    }

    public function title() {
        echo "Web 3 php practice";
    }

    public function body() {
        echo "<body>\n";
        $this->content();
        echo "</body>\n";
    }

    public function content() {
        echo "<b>Hello World</b>
        Sweet my php framework is working!";
    }

    public function generate() {
        $this->page();
    }
}