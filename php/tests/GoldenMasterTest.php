<?php

namespace Tests;

use App\GameRunner;
use PHPUnit\Framework\TestCase;
use Spatie\Snapshots\MatchesSnapshots;

class GoldenMasterTest extends TestCase {

    use MatchesSnapshots;

    /** @test */
    public function it_simulates_a_game()
    {
        // Arrange
        srand(1);
        ob_start(); // Start output buffering
        
        // Act
        GameRunner::run();

        $output = ob_get_clean(); // Store buffer AND cleans it
    
        // Assert
        $this->assertMatchesSnapshot($output);
        // echo $output; // will contain the contents
    }
}