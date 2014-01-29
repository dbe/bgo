$gofile = '/Users/dbe/Desktop/game.sgf'

class UnknownCommandError < StandardError
end

class GnuGo
  
  def initialize()
    #@io = IO.popen("gnugo --mode gtp -l /Users/dbe/Desktop/game.sgf", "r+")
    @io = IO.popen("gnugo --mode gtp", "r+")
  end

  #TODO: make private
  def send_message(message)
    @io.puts(message)
    ret = @io.gets()

    if ret == "? unknown command\n"
      raise UnknownCommandError
    end

    return ret
  end

  def get_komi()
    return send_message('get_komi')
  end
end


#puts "First"
#gg = GnuGo.new()

#puts "Second"
#puts gg.get_komi()

#puts "Third"
#puts gg.fuck().inspect

#puts "Exit"



