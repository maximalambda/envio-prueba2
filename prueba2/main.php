<?php
include 'input.php';
$firstGroup = [];
$firstLevelIndicator = ">";
$secondLevelIndicator = "----->";
$thirdLevelIndicator = "---------->";

function show($data){
	foreach ($data as $firstKey => $first) {
		echo "{$GLOBALS['firstLevelIndicator']} {$data[$firstKey]['name']}\n";
		foreach ($first as $secondKey => $second) {
			if (is_array($second)){
				// echo "{$secondKey} \n";
				foreach ($second as $thirdKey => $third) {
					if ($thirdKey === 'name'){

						echo "{$GLOBALS['secondLevelIndicator']} {$second["name"]}\n";
					}
					if (is_array($third)){
						foreach ($third as $fourthKey => $fourth) {
							if ($fourthKey === 'name'){
								echo "{$GLOBALS['thirdLevelIndicator']} {$third["name"]}\n";
							}
						}
					}
				}
			}
			// var_dump($first['name']);
			// echo "{$GLOBALS['secondLevelIndicator']} {$second[$secondKey]['name']}\n";
			// var_dump( is_array($second));
			// echo "{$GLOBALS['firstLevelIndicator']} {$data[$firstKey]['name']}\n";

		}
	}
}
function addData($data, $parent, $key, $element)
{
	if (array_key_exists($parent, $data)){
		$data[$parent][$key] = $element;
		var_dump('hoa');
	}
	show($data);

}
function main($data) {
	// todo: code here
	$data = $data;
	// show($data);
	$element = [
			"name"     => "One nameSubdataA3",
			"level"    => "Two",
			"priority" => "High"
	];
	addData($data, 'DataA', 'SubDataA3', $element);


}

// run code
main($data);
