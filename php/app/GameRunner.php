<?php

namespace App;

class GameRunner {
 
  static function run() {

    $notAWinner = false;
    
      $aGame = new Game();
      
      $aGame->add("Chet");
      $aGame->add("Pat");
      $aGame->add("Sue");
      
      
      do {
        
        $aGame->roll(rand(0,5) + 1);
        
        if (rand(0,9) == 7) {
          $notAWinner = $aGame->wrongAnswer();
        } else {
          $notAWinner = $aGame->wasCorrectlyAnswered();
        }
        
        
        
      } while ($notAWinner);
  }
}
 
