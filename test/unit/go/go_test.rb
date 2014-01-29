require 'test_helper'
require 'go/go'

class GoTest < ActionController::TestCase

  test "Unknown message exception" do
    gg = GnuGo.new()
    assert_raises(UnknownCommandError) do
      gg.send_message("I'm not a real command")
    end
  end

  test "set_komi works" do
    gg = GnuGo.new()
    assert_equal("0.0", gg.get_komi())
    gg.set_komi("5.0")
    assert_equal("5.0", gg.get_komi())
  end
end
