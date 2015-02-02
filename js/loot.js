var GAME = GAME || {

	items: [{
		id: 'xdm',
		name: 'Springfield X-DM 9mm',
		type: 'weapon',
		desc: 'A Springfield Armory-made hand gun chambered in 9mm.',
		chance: 5
	}, {
		id: 'p226',
		name: 'Sig-Sauer P226 45ACP',
		type: 'weapon',
		desc: 'Sig-Sauer-manufactured 45mm hand gun.',
		chance: 4
	}, {
		id: 'm16',
		name: 'M16A2 Assault Rifle',
		type: 'weapon',
		desc: 'US military standard issue assault rifle with fire selection.',
		chance: 2
	}, {
		id: 'm4a1',
		name: 'M4A1 Carbine',
		type: 'weapon',
		desc: 'US military and police carbine. Compact variant of the M16 best suited for close combat.',
		chance: 3
	}, {
		id: 'huntingrifle',
		name: 'Hunting Rifle',
		type: 'weapon',
		desc: 'An old hunting rifle with a wooden stock, chambered in .30-06.',
		chance: 5
	}, {
		id: '8xscope',
		name: '8x Rifle Scope',
		type: 'accessory',
		desc: 'An 8x rifle scope made to fix to a rifle with a Picatinny rail.',
		chance: 6
	}, {
		id: 'm4foldingstock',
		name: 'M4A1 Folding Stock',
		type: 'accessory',
		desc: 'A replacement folding stock for the M4A1 carbine.',
		chance: 5
	}, {
		id: 'bat',
		name: 'Baseball Bat',
		type: 'weapon',
		desc: 'A wooden bat that can be used for bludgeoning.',
		chance: 10
	}, {
		id: 'water',
		name: 'Bottle of Water',
		type: 'consumable',
		desc: 'A cool, clean bottle of water.',
		chance: 20
	}, {
		id: 'wood',
		name: 'Wood',
		type: 'materials',
		desc: 'Wood to build things with.',
		chance: 25
	}, {
		id: 'apple',
		name: 'Apple',
		type: 'consumable',
		desc: 'A crisp Washington apple.',
		chance: 20
	}, {
		id: 'soda',
		name: 'Can of Soda',
		type: 'consumable',
		desc: 'A 12oz. can of carbonated goodness.',
		chance: 25
	}, {
		id: 'crowbar',
		name: 'Crowbar',
		type: 'weapon',
		desc: 'A hefty crowbar handy for opening doors or self-defense.',
		chance: 8
	}, {
		id: 'trap',
		name: 'TRAP!',
		type: 'explosive',
		desc: 'A spring trap rigged to explode!',
		chance: 1
	}, {
		id: 'diamonds',
		name: 'Bag of Diamonds',
		type: 'valuable',
		desc: 'A small velvet bag filled with large, intricately cut diamonds.',
		chance: 1
	}],

	containerTypes: [{
		type: 'small',
		name: 'Small',
		chance: 90
	}, {
		type: 'medium',
		name: 'Medium',
		chance: 50
	}, {
		type: 'large',
		name: 'Large',
		chance: 25
	}, {
		type: 'epic',
		name: 'Epic',
		chance: 5
	}],

	init: function() {
		var numberOfContainers = this.getRandomNumber(0, 8),
			type,
			chance,
			i;

		for (i = 0; i < numberOfContainers; i++) {

			type = this.getRandomNumber(0, this.containerTypes.length - 1);
			chance = this.getRandomNumber(0, 100);

			if (this.containerTypes[type].chance >= chance) {
				$('<button type="button" class="' + this.containerTypes[type].type + '">' + this.containerTypes[type].name + ' Box</button>').appendTo('#loot');
			}
		}

		$('<div id="container"><ul id="items"><ul></div>').appendTo('#loot');
	},

	getRandomNumber: function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	getLoot: function(containerType) {
		var i,
			item,
			items,
			chance,
			lootAmt,
			minCapacity,
			maxCapacity,
			maxLimit,
			container = [];

		switch (containerType) {
			case 'epic':
				minCapacity = 15;
				maxCapacity = 25;
				maxLimit = 1;
			case 'large':
				minCapacity = 5;
				maxCapacity = 15;
				maxLimit = 25;
				break;
			case 'medium':
				minCapacity = 2;
				maxCapacity = 10;
				maxLimit = 50;
				break;
			case 'small':
			default:
				minCapacity = 0;
				maxCapacity = 5;
				maxLimit = 100;
				break;
		}

		lootAmt = this.getRandomNumber(minCapacity, maxCapacity);

		for (i = 0; i < lootAmt; i++) {
			item = this.getRandomNumber(0, this.items.length - 1);
			chance = this.getRandomNumber(1, maxLimit);

			if (this.items[item].chance >= chance) {
				container.push(this.items[item]);
			}

		}

		return container;
	},

	listLoot: function(containerType) {
		var i,
			itemCount = 1,
			loot = this.getLoot(containerType);

		$('#container').html('').addClass(containerType);

		if (loot.length === 0) {

			$('#container').append('<p>This container is empty.</p>');

		} else {

			$('<ul />').attr('id', 'items').appendTo('#container');

			for (i = 0; i < loot.length; i++) {

				if ($('#items li#' + loot[i].id).length === 0) {
					$('<li />').attr('id', loot[i].id).html('<strong>' + loot[i].name + '</strong><span>' + loot[i].desc + '</span><span class="count"></span>').appendTo('#items');
				} else {
					itemCount++;
				}

				if (itemCount > 1 && loot[i].id !== 'trap') {
					$('#items li#' + loot[i].id + ' .count').text(itemCount);
				}

			}

			if ($('#items li#trap').length > 0) {
				this.setOffTrap();
			}

			if ($('#items li#diamonds').length > 0) {
				this.showCongrats();
			}



		}

		$('#container').show();
	},

	setOffTrap: function() {
		var count = 3,
			interval;

		$('#trap').append('</p>');

		interval = setInterval(function() {
			$('#trap > p').append(count + '... ');
			count--;

			if (count === 0) {
				clearInterval(interval);
				setTimeout(function() {
					alert('BOOM! You\'re dead!');
				}, 1500);
			}

		}, 1000);
	},

	showCongrats: function() {
		setTimeout(function() {
			alert('CONGRATS! You found the diamonds!');
		}, 1000);
	}

};

$(function() {

	GAME.init();

	$('button').on('click', function(e) {
		GAME.listLoot(e.target.className);
		$(this).attr('disabled', 'disabled').text('Opened');
	});

});