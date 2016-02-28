<?php

use App\Weight;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class HomeControllerTest extends TestCase
{
    use DatabaseMigrations;

    public function test_home_page_has_title_and_a_button_to_add_weigh_in()
    {
        $this->visit('/')
            ->see('Watch Yo Weight')
            ->see('Weigh In');
    }

    public function test_weights_show_on_home_page()
    {
        factory(Weight::class)->create(['weight' => 175, 'date' => date('2016-02-01')]);
        factory(Weight::class)->create(['weight' => 170, 'date' => date('2016-02-10')]);
        factory(Weight::class)->create(['weight' => 165, 'date' => date('2016-02-30')]);

        $this->visit('/')
            ->see('175')
            ->see('170')
            ->see('165');
    }
}
