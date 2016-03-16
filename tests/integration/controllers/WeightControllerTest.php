<?php

use App\Weight;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class WeightControllerTest extends TestCase
{
    use DatabaseMigrations;

    public function test_get_all_weights()
    {
        factory(Weight::class)->create(['weight' => 175, 'date' => date('2016-02-01')]);
        factory(Weight::class)->create(['weight' => 170, 'date' => date('2016-02-10')]);
        factory(Weight::class)->create(['weight' => 165, 'date' => date('2016-02-22')]);

        $this->json('GET', '/weight/all')
            ->seeJson(['id' => 1, 'weight' => '175.0', 'date' => '2016-02-01'])
            ->seeJson(['id' => 1, 'weight' => '170.0', 'date' => '2016-02-10'])
            ->seeJson(['id' => 1, 'weight' => '165.0', 'date' => '2016-02-22']);
    }

    public function test_add_weight()
    {
        $response = [
            'success' => true,
            'message' => 'Weight Added.'
        ];

        $this->json('POST', '/weight/add', ['weight' => '155', 'date' => '2016-03-01'])
            ->seeJsonEquals($response)
            ->seeInDatabase('weights', ['weight' => '155', 'date' => '2016-03-01']);
    }

    public function test_delete_weight()
    {
        $response = [
            'success' => true,
            'message' => 'Weight Deleted.'
        ];

        $weight = factory(Weight::class)->create(['weight' => 175, 'date' => date('2016-02-01')]);

        $this->json('POST', '/weight/delete', ['id' => $weight->id])
            ->seeJsonEquals($response);

        $this->assertTrue(Weight::all()->isEmpty());
    }

    public function test_get_chart_data()
    {
        factory(Weight::class)->create(['weight' => 175, 'date' => date('2016-02-01')]);
        factory(Weight::class)->create(['weight' => 170, 'date' => date('2016-02-10')]);
        factory(Weight::class)->create(['weight' => 165, 'date' => date('2016-02-22')]);

        $this->json('GET', '/weight/chart-data')
            ->seeJson(['weights' => ['175.0','170.0','165.0']])
            ->seeJson(['dates' => ['2016-02-01','2016-02-10','2016-02-22']]);
    }

}
