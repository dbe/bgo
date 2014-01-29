require 'test_helper'
require 'go/go'

class GoTest < ActionController::TestCase

  test "Unknown message exception" do
    gg = GnuGo.new()
    assert_raises(UnknownCommandError) do
      gg.send_message("I'm not a real command")
    end
  end
end
