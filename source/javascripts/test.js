function testObject () {
	if (globalData.inDevelopment) {
		this.assertObject = function (obj, name) {
			if (typeof obj != 'object') {
				throw new Error(name + ' is not an object');
			}

			return true;
		}

		this.notEmpty = function (obj, name) {
			if (obj.length == 0 || obj.length == undefined) {
				throw new Error (name + ' may not be empty');
			}

			return true;
		}

		this.notUndefined = function (obj, name) {
			if (obj == undefined || obj == 'undefined') {
				this.throwError(name + ' may not be undefined');
				return false;
			}

			return true;
		}

		this.mustBe = function (parameter, parameterTwo, name) {
			if (parameter != parameterTwo) {
				throw new Error (name + ' is not equal(Must be same)');
			}

			return true;
		}

		this.throwError = function(theError, color) {
			if (theError) {
				console.log(theError);
			} else {
				this.throwError('No error was given');
			}
		}
	}
}


function testCase(name, tests) {
	var successful = 0;
	var testCount = 0;
	for (var test in tests) {
		try {
			tests[test]();
		} catch (e) {
			Test.throwError(test + " failed: " + e.message, "#c00");
		}
	}
}