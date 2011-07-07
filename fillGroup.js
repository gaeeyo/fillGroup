/*
  iTunes と COM

  グループが空になってるトラックを埋める
  トラック名、アーティスト、アルバム、トラック番号が一致する他の
  トラックからコピーして埋めるスクリプト

*/

var	iTunesApp = WScript.CreateObject("iTunes.Application");
var	mainLibrary = iTunesApp.LibraryPlaylist;

main(WScript.Arguments);

function main(args) {
	var doFill = false;
	
	for (var j=0; j<args.length; j++) {
		if (args(j) == '-x') {
			doFill = true;
		}
	}

	fillGroup(doFill);

	if (!doFill) {
		WScript.Echo("\nまだ書き換えていません。\n" +
			"書き換えるときは -x を付けて起動。\n" +
			"必ずバックアップをとってから。");
	}
}

function fillGroup(doFill)
{
	var tracks = mainLibrary.Tracks;

	for (var j=1; j<tracks.Count; j++) {
		var track = tracks.Item(j);

		// グループが空のものを探す
		if (track.Grouping == "") {
			// 空のものがあったら、トラック名、アーティスト、アルバム、トラック番号一致する
			// 他のファイルからコピーしてくる
			var matched = mainLibrary.Search(track.Name, 5); // トラック名で絞り込む

			// 処理対象のトラック名を表示
			//WScript.Echo(track.Name + " " + (matched.Count-1));

			for (var k=1; k<matched.Count; k++) {
				var x = matched.Item(k);
				if (track.Name == x.Name && track.Artist == x.Artist
						&& track.Album == x.Album && track.TrackNumber == x.TrackNumber
						&& x.Grouping != "") {
					WScript.Echo(x.Name + " => " + x.Grouping);
					if (doFill) {
						WScript.Echo("書き変えた");
					}
					break;
				}
			}
		}
	}
}


function test2() {

	tracks = mainLibrary.Search("カーボーイ", 0);

	for (var j=1; j<tracks.Count; j++) {
			var track = tracks.Item(j);
			track.Grouping = "TTTBBBSSS";
			WScript.Echo(track.Name  + " / " + track.Album+ " by " + track.Artist + " # " + track.Grouping);
	}
}

function test1()
{
	// "mp3" プレイリスト
	var playlist = iTunesApp.LibrarySource.PlayLists.ItemByName("mp3");
	var tracks = playlist.Tracks;

	for (var j=1; j<tracks.Count; j++) {
		var track = tracks.Item(j);
		t
		WScript.Echo(track.Name  + " / " + track.Album+ " by " + track.Artist + " # " + track.Grouping);
	}
}