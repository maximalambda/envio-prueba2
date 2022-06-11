<?php

$data = [
	"DataA" => [
		"name"      => "One nameA",
		"level"     => "One",
		"priority"  => "Low",
		"SubDataA"  => [
			"name"     => "One nameSubdataA",
			"level"    => "Two",
			"priority" => "High"
		],
		"SubDataA2" => [
			"name"       => "One nameSubDataA2",
			"level"      => "One",
			"priority"   => "Highest",
			"SubDataA2A" => [
				"name"     => "One nameSubdataA2A",
				"level"    => "One",
				"priority" => "Lowest"
			],
			"SubDataA2B" => [
				"name"     => "One nameSubdataA2B",
				"level"    => "One",
				"priority" => "Highest"
			],
			"SubDataA2D" => [
				"name"     => "One nameSubdataA2D",
				"level"    => "Zero",
				"priority" => "Highest"
			]
		]
	],
	"DataB" => [
		"name"     => "One nameB",
		"level"    => "Four",
		"priority" => "Highest",
		"subDataB" => [
			"name"     => "One nameSubDataB",
			"level"    => "One",
			"priority" => "Highest"
		]
	],
	"DataD" => [
		"name"     => "One nameD",
		"level"    => "Two",
		"priority" => "Highest"
	],
	"DataC" => [
		"name"     => "One nameC",
		"level"    => "Two",
		"priority" => "High",
		"subDataC" => [
			"name"     => "One nameSubDataC",
			"level"    => "One",
			"priority" => "Low"
		]
	]
]
?>